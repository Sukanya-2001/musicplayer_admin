import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const HomeWrapper = styled(Box)`
  padding: 20px;
`;

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  publishYear: yup.number().required("Publish Year is required"),
  imageFile: yup.mixed().required("Image file is required"),
  selectArtist: yup
    .array()
    .required("Artists is required")
    .min(1, "At least one artist must be selected"),
  selectAlbum: yup
    .string()
    .required("Album is required")
    .min(1, "At least one artist must be selected"),
  songType: yup
    .array()
    .required("Song type is required")
    .min(1, "At least one song type must be selected"),
  language: yup.string().required("Language is required")
});

const SongAdd = () => {
  const [selectedSongImage, setSelectedSongImage] = useState<string | null>(
    null
  );

  const handleSongImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedSongImage(imageUrl);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <DashboardWrapper headerTitle="Add Song">
      <HomeWrapper>
        <h2>Add Song</h2>
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
              <Controller
                name="publishYear"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Publish Year"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.publishYear}
                    helperText={errors.publishYear?.message}
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
                  {selectedSongImage ? (
                    <img
                      src={selectedSongImage}
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
                          handleSongImageChange(e);
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
          <h2>Add Artists</h2>
          <Controller
            name="selectArtist"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Select artists</InputLabel>
                <Select {...field} multiple value={field.value || []}>
                  <MenuItem value="sad">Sad</MenuItem>
                  <MenuItem value="happy">Happy</MenuItem>
                  <MenuItem value="romantic">Romantic</MenuItem>
                  <MenuItem value="rap">Rap</MenuItem>
                  <MenuItem value="solo">Solo</MenuItem>
                </Select>
                {fieldState.error && (
                  <p style={{ color: "red", fontSize: "0.75rem" }}>
                    {fieldState.error.message}
                  </p>
                )}
              </FormControl>
            )}
          />
          <h2>Add Album</h2>
          <Controller
            name="selectAlbum"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Select album</InputLabel>
                <Select {...field}>
                  <MenuItem value="sad">The local train</MenuItem>
                  <MenuItem value="happy">Divide (÷) – Ed Sheeran</MenuItem>
                  <MenuItem value="romantic">Lover – Taylor Swift</MenuItem>
                  <MenuItem value="rap">Purpose – Justin Bieber</MenuItem>
                  <MenuItem value="solo">Folklore – Taylor Swift</MenuItem>
                </Select>
                {fieldState.error && (
                  <p style={{ color: "red", fontSize: "0.75rem" }}>
                    {fieldState.error.message}
                  </p>
                )}
              </FormControl>
            )}
          />
          <h2>Others</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="songType"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                  >
                    <InputLabel>Song Type</InputLabel>
                    <Select {...field} multiple value={field.value || []}>
                      <MenuItem value="sad">Sad</MenuItem>
                      <MenuItem value="happy">Happy</MenuItem>
                      <MenuItem value="romantic">Romantic</MenuItem>
                      <MenuItem value="rap">Rap</MenuItem>
                      <MenuItem value="solo">Solo</MenuItem>
                    </Select>
                    {fieldState.error && (
                      <p style={{ color: "red", fontSize: "0.75rem" }}>
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="language"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                  >
                    <InputLabel>Language</InputLabel>
                    <Select {...field}>
                      <MenuItem value="hindi">Hindi</MenuItem>
                      <MenuItem value="english">English</MenuItem>
                      <MenuItem value="bengali">Bengali</MenuItem>
                    </Select>
                    {fieldState.error && (
                      <p style={{ color: "red", fontSize: "0.75rem" }}>
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default SongAdd;
