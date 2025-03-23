import {
  useEditArtistHook,
  useGetArtistInfoHook
} from "@/api/functions/artist.api";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { artistPayload, artistSchema } from "Schema/artist.schema";
import { HomeWrapper } from "../artists";
import { useQueryClient } from "@tanstack/react-query";
import { GET_ARTIST } from "@/hooks/queryKeys";

const ArtistEdit = () => {
  const [selectedArtistImage, setSelectedArtistImage] = useState<string | null>(
    null
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = router.query.id;
  const { data: artistInfo } = useGetArtistInfoHook(id as string);

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

  const { mutateAsync: updateMutate, isPending: updatePending } =
    useEditArtistHook(id as string);

  const onSubmit = (data: artistPayload) => {
    console.log(data);

    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.subtitle);

    if (data?.imageFile instanceof File) {
      formData.append("image", data?.imageFile);
    }
    updateMutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        
        if (res) {
            console.log("here");
            
          reset();
          queryClient.refetchQueries({ queryKey: [GET_ARTIST], exact: true });
          
          //   router.push("/dashboard/artists");
        }
      }
    });
  };

  useEffect(() => {
    if (artistInfo) {
      setValue("title", artistInfo?.title);
      setValue("subtitle", artistInfo?.description);
      setValue("imageFile", artistInfo?.file);
      setSelectedArtistImage(artistInfo?.file);
    }
  }, [artistInfo]);

  return (
    <DashboardWrapper headerTitle="Add Artist">
      <HomeWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label>Artist Name</label>
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
              <label>Artist Description</label>
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

export default ArtistEdit;
