import { Album, useGetAlbumHook } from "@/api/functions/album.api";
import { Artist, useGetArtistHook } from "@/api/functions/artist.api";
import { useAddSongHook } from "@/api/functions/song.api";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { songCategories } from "@/lib/static/Demo";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const HomeWrapper = styled(Box)`
  padding: 20px;
`;

const fileOrString = yup
  .mixed()
  .test("fileOrString", "Must be a file (PNG, SVG, JPEG, JPG)", (value) => {
    if (!value) return true;
    if (typeof value === "string") return true;

    if (value instanceof File) {
      const allowedTypes = [
        "image/png",
        "image/svg+xml",
        "image/jpeg",
        "image/jpg"
      ];

      return allowedTypes.includes(value.type);
    }

    return false;
  });

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  publishYear: yup.number().required("Publish Year is required"),

  // imageFile: yup.mixed().required("Image file is required"),
  imageFile: fileOrString.required(),
  songFile: yup
    .mixed<File | string>()
    .test(
      "required",
      "Audio file is required",
      (value) => typeof value === "string" || value instanceof File
    )
    .test(
      "fileType",
      "Only audio files (MP3, WAV, M4A) are allowed",
      (value) => {
        if (typeof value === "string") return true;
        if (value instanceof File) {
          return ["audio/mpeg", "audio/wav", "audio/mp4", "audio/mp3"].includes(
            value.type
          );
        }

        return false;
      }
    ),
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
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);

  const {
    data: artistData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetArtistHook();

  const artistList: Artist[] = useMemo(() => {
    if (artistData) {
      return artistData?.pages?.flatMap((s) => s?.artists || []);
    }

    return [];
  }, [JSON.stringify(artistData)]);

  const {
    data: albumData,
    isLoading: albumLoading,
    fetchNextPage: albumfetchNextPage,
    hasNextPage: albumhasNextPage,
    isFetchingNextPage: albumisFetchingNextPage
  } = useGetAlbumHook();

  const albumList: Album[] = useMemo(() => {
    if (albumData) {
      return albumData?.pages?.flatMap((s) => s?.albums || []);
    }

    return [];
  }, [JSON.stringify(albumData)]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleSongImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedSongImage(imageUrl);
      setValue("imageFile", file);
    }
  };
  const handleSongFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected Song File:", file);
      console.log("File Type:", file.type);
      setSelectedAudioFile(file);
      setValue("songFile", file);

      // You can handle file upload logic here
    }
  };

  const { mutateAsync: addMutate } = useAddSongHook();

  const onSubmit = (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("subtitle", data?.subtitle);
    formData.append("publishYear", data?.publishYear);
    if (data?.imageFile instanceof FileList && data.imageFile.length > 0) {
      formData.append("image", data.imageFile[0]);
    } else if (data?.imageFile instanceof File) {
      formData.append("image", data.imageFile);
    }

    if (data?.songFile instanceof FileList && data.songFile.length > 0) {
      formData.append("audio", data.songFile[0]);
    } else if (data?.songFile instanceof File) {
      formData.append("audio", data.songFile);
    }
    formData.append("selectAlbum", data?.selectAlbum);
    formData.append("language", data?.language);
    formData.append("songType", data?.songType);
    data?.selectArtist?.map((item: string) =>
      formData.append("selectArtist", item)
    );
    addMutate(formData, {
      onSuccess: (res) => {
        if (res?.status === 201) {
          reset();

          // queryClient.refetchQueries({ queryKey: [GET_ALBUM], exact: true });
          // router.push("/dashboard/album");
        }
      }
    });
  };

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
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                >
                  {selectedAudioFile ? (
                    <audio
                      controls
                      key={selectedAudioFile.name + selectedAudioFile.size}
                    >
                      <source
                        src={URL.createObjectURL(selectedAudioFile)}
                        type={selectedAudioFile.type}
                        key={selectedAudioFile.size}
                      />
                      Your browser does not support the audio element.
                    </audio>
                  ) : null}
                </Box>

                {/* File Upload Input */}
                <FormControl error={!!errors.songFile}>
                  <Controller
                    name="songFile"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="songInput"
                        className="fileUpload"
                        type="file"
                        accept="audio/mp3, audio/wav, audio/ogg"
                        onChange={(e) => {
                          field.onChange(e);
                          handleSongFileChange(e);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  />
                  <FormHelperText>{errors.songFile?.message}</FormHelperText>
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
                  {isLoading ? (
                    <CircularProgress size={28} sx={{ color: "white" }} />
                  ) : !!artistList && artistList?.length > 0 ? (
                    artistList?.map((item) => (
                      <MenuItem value={item?._id} key={item?._id}>{item?.title}</MenuItem>
                    ))
                  ) : (
                    <Typography>No artist found.</Typography>
                  )}
                  {!!hasNextPage && (
                    <Box
                      p={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {" "}
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          fetchNextPage();
                        }}
                        type="button"
                        disabled={isFetchingNextPage}
                      >
                        {isFetchingNextPage ? (
                          <CircularProgress size={28} sx={{ color: "white" }} />
                        ) : (
                          "Load more"
                        )}
                      </CustomButtonPrimary>
                    </Box>
                  )}
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
                  {albumLoading ? (
                    <CircularProgress size={28} sx={{ color: "white" }} />
                  ) : !!albumList && albumList?.length > 0 ? (
                    albumList?.map((item) => (
                      <MenuItem value={item?._id} key={item?._id}>{item?.title}</MenuItem>
                    ))
                  ) : (
                    <Typography>No album found.</Typography>
                  )}
                  {!!albumhasNextPage && (
                    <Box
                      p={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {" "}
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          albumfetchNextPage();
                        }}
                        type="button"
                        disabled={albumisFetchingNextPage}
                      >
                        {albumisFetchingNextPage ? (
                          <CircularProgress size={28} sx={{ color: "white" }} />
                        ) : (
                          "Load more"
                        )}
                      </CustomButtonPrimary>
                    </Box>
                  )}
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
                      {songCategories?.map((item) => (
                        <MenuItem value={item?.value} key={item?.value}>{item?.label}</MenuItem>
                      ))}
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
