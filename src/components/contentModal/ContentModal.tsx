import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { ContentProps } from "../../config/types";
import Carousel from "../carousel/Carousel";
import GuestSession from "../guestSession/Guest";
import "./ContentModal.css";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../config/colors";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: PRIMARY_COLOR,
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
  },
}));

export default function ContentModal({
  children,
  media_type,
  id,
}: ContentProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<any>([]);
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer", backgroundColor: SECONDARY_COLOR }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        {content && (
          <div className={classes.paper}>
            <div className="ContentModal">
              <img
                src={
                  content.poster_path
                    ? `${img_500}/${content.poster_path}`
                    : unavailable
                }
                alt={content.name || content.title}
                className="ContentModal__portrait"
              />
              <img
                src={
                  content.backdrop_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape
                }
                alt={content.name || content.title}
                className="ContentModal__landscape"
              />
              <div className="ContentModal__about">
                <span className="ContentModal__title">
                  {content.name || content.title} (
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  )
                </span>
                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}

                <span className="ContentModal__description">
                  {content.overview}
                </span>

                <div>
                  <Carousel id={id} media_type={media_type} />
                </div>
                <GuestSession id={id} />
                <Button
                  variant="contained"
                  startIcon={<YouTubeIcon />}
                  style={{ backgroundColor: SECONDARY_COLOR, color: "white" }}
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  Watch the Trailer
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
