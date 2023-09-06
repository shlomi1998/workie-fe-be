import React, {
  useContext,
  useState,
  useRef,
  ChangeEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Box, Modal, Slider, Button } from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { AddingProfile } from "../pages";

// Styles
const boxStyle: React.CSSProperties = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};
const modalStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Modal
interface CropperModalProps {
  src: string | null;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string | null>>;
  ifSubmit: boolean;
  setIfSubmit: Dispatch<SetStateAction<boolean>>;
}

const CropperModal: React.FC<CropperModalProps> = ({
  src,
  modalOpen,
  setModalOpen,
  setPreview,
  ifSubmit,
  setIfSubmit,
}) => {
  const [slideValue, setSlideValue] = useState<number>(10);
  const cropRef = useRef<AvatarEditor | null>(null);
  const userContext = useContext(AppContext);
  // handle save
  const handleSave = async () => {
    if (cropRef.current && src) {
      console.log("gggg");
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
      setModalOpen(false);

     

      const formData = new FormData();
      formData.append("image", blob, "image.png");

      try {
        const response = await axios.post("/single", formData);
        userContext?.setImageSource(response.data.filename);
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(ifSubmit);

  const saveImage = async () => {
    console.log(cropRef.current);
    const dataUrl: any = cropRef.current?.getImage().toDataURL();
    const result = await fetch(dataUrl);
    const blob = await result.blob();

    // Create a FormData object and append the image file to it

    const formData = new FormData();
    formData.append("image", blob, "image.png");

    try {
      const response = await axios.post("/single", formData);
      userContext?.setImageSource(response.data.filename);
      setIfSubmit(false);
    } catch (error) {
      console.error(error);
    }

   
  };
  if (ifSubmit) {
    saveImage();
  }

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        {src && (
          <AvatarEditor
            ref={cropRef}
            image={src}
            style={{ width: "100%", height: "100%" }}
            border={50}
            borderRadius={150}
            color={[18, 33, 69, 0.8]}
            scale={slideValue / 10}
            rotate={0}
          />
        )}

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "white",
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e: any, value) => setSlideValue(value as number)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            border: "3px solid white",
            background: "#122145",
          }}
        >
          <Button
            size="small"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={() => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: "#65d29f", color: "white", borderColor: "white" }}
            size="small"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default CropperModal;
