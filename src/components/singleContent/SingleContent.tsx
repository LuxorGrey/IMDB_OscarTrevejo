import Badge from "@mui/material/Badge";
import { img_300, unavailable } from "../../config/config";
import { SingleContentProps } from "../../config/types";
import ContentModal from "../contentModal/ContentModal";
import "./SingleContent.css";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}: SingleContentProps) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average.toFixed(1)}
        color={
          vote_average > 7 ? "success" : vote_average > 4 ? "warning" : "error"
        }
      />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
