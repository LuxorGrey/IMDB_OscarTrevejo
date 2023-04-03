import { Rating } from "@mui/material";
import React, { useState, useEffect } from "react";

interface IGuestSessionResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

type GuestSessionProps = {
  id: number;
};

async function rateMovie(
  apiKey: string,
  guestSessionId: string,
  movieId: number,
  rating: number
): Promise<IGuestSessionResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        value: rating,
      }),
    }
  );
  const data = await response.json();
  return data;
}
const GuestSession = ({ id }: GuestSessionProps) => {
  const [session, setSession] = useState<IGuestSessionResponse>({
    success: false,
    guest_session_id: "",
    expires_at: "",
  });
  const [value, setValue] = React.useState<number>(0);

  async function createGuestSession(): Promise<IGuestSessionResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    return data;
  }
  useEffect(() => {
    async function fetchSession() {
      const data = await createGuestSession();
      setSession(data);
    }
    fetchSession();
  }, []);

  useEffect(() => {
    async function sendRating() {
      await rateMovie(
        process.env.REACT_APP_API_KEY as string,
        session.guest_session_id,
        id,
        value
      );
    }
    if (value !== 0) {
      sendRating();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event: React.ChangeEvent<{}>, newValue: number | null) => {
          setValue(newValue as number);
        }}
      />
    </div>
  );
};

export default GuestSession;
