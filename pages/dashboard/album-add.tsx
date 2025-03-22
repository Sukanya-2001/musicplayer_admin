import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  TextField
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { HomeWrapper } from "./album";

const artistSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  imageFile: yup.mixed().required("Image file is required")
});
const AlbumAdd = () => {
  const [selectedArtistImage, setSelectedArtistImage] = useState<string | null>(
    null
  );
  const handleArtistImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedArtistImage(imageUrl);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(artistSchema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <DashboardWrapper headerTitle="Add Album">
      <HomeWrapper>
        <h2>Add Album</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    margin="normal"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="subtitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subtitle"
                    fullWidth
                    margin="normal"
                    error={!!errors.subtitle}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                height="100%"
                paddingLeft={1}
              >

                {/* Image Preview Box */}
                <Box
                  width={70}
                  height={60}

                  // border="1px solid #ccc"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                >
                  {selectedArtistImage ? (
                    <img
                      src={selectedArtistImage}
                      alt="Selected"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  ) : null}
                </Box>

                {/* File Upload Input */}
                <FormControl error={!!errors.imageFile}>
                  <Controller
                    name="imageFile"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="fileInput"
                        className="fileUpload"
                        type="file"
                        accept="image/png, image/jpeg, image/svg"
                        onChange={(e) => {
                          field.onChange(e);
                          handleArtistImageChange(e);
                        }}
                        style={{
                          textAlign: "center",
                          cursor: "pointer"
                        }}
                      />
                    )}
                  />
                  <FormHelperText>{errors.imageFile?.message}</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </form>
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default AlbumAdd;
