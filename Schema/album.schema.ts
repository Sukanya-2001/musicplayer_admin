import * as yup from 'yup';

export const albumSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  imageFile: yup.mixed().required("Image file is required")
});

export type albumPayload = yup.InferType<typeof albumSchema>;