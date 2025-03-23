import { useAddArtistHook } from "@/api/functions/artist.api";
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
import { artistPayload, artistSchema } from "Schema/artist.schema";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HomeWrapper } from "./artists";
import { useQueryClient } from "@tanstack/react-query";
import { GET_ARTIST } from "@/hooks/queryKeys";

const ArtistAdd = () => {
  const [selectedArtistImage, setSelectedArtistImage] = useState<string | null>(
    null
  );
  const router = useRouter();
  const queryClient= useQueryClient();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<artistPayload>({
    resolver: yupResolver(artistSchema)
  });
  const handleArtistImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedArtistImage(imageUrl);
      setValue("imageFile", file);
    }
  };

  const { mutateAsync: addMutate, isPending: addPending } = useAddArtistHook();

  const onSubmit = (data: artistPayload) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.subtitle);

    if (data?.imageFile instanceof File) {
      formData.append("image", data?.imageFile);
    }
    addMutate(formData, {
      onSuccess: (res) => {
        if (res?.status === 201) {
          reset();
          queryClient.refetchQueries({ queryKey: [GET_ARTIST], exact: true });
          router.push("/dashboard/artists");
        }
      }
    });
  };

  return (
    <DashboardWrapper headerTitle="Add Artist">
      <HomeWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Artist name"
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
                    label="Description"
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
          <CustomButtonPrimary
            type="submit"
            variant="contained"
            color="primary"
            disabled={addPending}
            sx={{ mt: 3, mb: 2, width: "200px" }}
          >
            {addPending ? (
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

export default ArtistAdd;
