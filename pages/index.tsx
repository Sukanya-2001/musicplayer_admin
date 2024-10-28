import { Button } from "@mui/material";
import StorySec from "@/components/StorySec/StorySec";
import assest from "@/json/assest";
import { cardList } from "@/json/mock/cardlist.mock";
import Wrapper from "@/layout/wrapper/Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <StorySec cardList={cardList} image={assest?.story_img} title="Our Story">
        <Button variant="contained" color="error">
          sjsbj
        </Button>
      </StorySec>
    </Wrapper>
  );
}
