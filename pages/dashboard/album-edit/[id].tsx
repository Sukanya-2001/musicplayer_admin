import {
  useEditAlbumHook,
  useGetAlbumInfoHook
} from "@/api/functions/album.api";
import { GET_ALBUM } from "@/hooks/queryKeys";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  TextField
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { albumPayload, albumSchema } from "Schema/album.schema";
import { HomeWrapper } from "../album";

const AlbumEdit = () => {
  const [selectedArtistImage, setSelectedArtistImage] = useState<string | null>(
    null
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = router.query.id;
  const { data: albumInfo } = useGetAlbumInfoHook(id as string);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<albumPayload>({
    resolver: yupResolver(albumSchema)
  });
  const handleAlbumImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedArtistImage(imageUrl);
      setValue("imageFile", file);
    }
  };
  const { mutateAsync: updateMutate, isPending: updatePending } =
    useEditAlbumHook(id as string);

  const onSubmit = (data: albumPayload) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.subtitle);
    if (
      !!data?.imageFile &&
      (data.imageFile instanceof File ||
        data.imageFile instanceof Blob ||
        typeof data.imageFile === "string")
    ) {
      formData.append("image", data.imageFile);
    }
    updateMutate(formData, {
      onSuccess: (res) => {
        if (res) {
          queryClient.refetchQueries({ queryKey: [GET_ALBUM], exact: true });
          router.push("/dashboard/album");
        }
      }
    });
  };

  useEffect(() => {
    if (albumInfo) {
      setValue("title", albumInfo?.title);
      setValue("subtitle", albumInfo?.description);
      setValue("imageFile", albumInfo?.file);
      setSelectedArtistImage(albumInfo?.file);
    }
  }, [albumInfo]);

  return (
    <DashboardWrapper headerTitle="Add Album">
      <HomeWrapper>
        <h2>Add Album</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <label>Album name</label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <label>Album Description</label>
              <Controller
                name="subtitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
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
                          handleAlbumImageChange(e);
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
          <CustomButtonPrimary
            type="submit"
            variant="contained"
            color="primary"
            disabled={updatePending}
            sx={{ mt: 3, mb: 2, width: "200px" }}
          >
            {updatePending ? (
              <CircularProgress size={28} sx={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </CustomButtonPrimary>
        </form>
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default AlbumEdit;
