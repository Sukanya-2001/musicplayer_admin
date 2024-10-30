import StorySec from "@/components/StorySec/StorySec";
import assest from "@/json/assest";
import { cardList } from "@/json/mock/cardlist.mock";
import Wrapper from "@/layout/wrapper/Wrapper";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

export default function Home() {
  const notify = () => toast("Here is your toast.");

  return (
    <Wrapper>
      <StorySec cardList={cardList} image={assest?.story_img} title="Our Story">
        <Button onClick={notify} variant="contained" color="error">
          sjsbj
        </Button>
      </StorySec>
    </Wrapper>
  );
}
