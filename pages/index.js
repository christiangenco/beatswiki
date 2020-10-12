import { useState, useEffect } from "react";
import Head from "next/head";
import Shell from "../components/Shell";

import { formatISO9075, format } from "date-fns";

import useInterval from "../hooks/useInterval";
import { beatsToDate, dateToBeats } from "../utils";

const secondsPerBeat = 86.4;

function P({ children }) {
  return <p className="mb-2 text-lg">{children}</p>;
}

function Highlight({ children }) {
  return <span className="rounded p-1 bg-yellow-100">{children}</span>;
}

export default function Home() {
  const title = ".Beat Swatch® Internet Time Wiki";

  const [now, setNow] = useState(new Date());

  useInterval(() => {
    setNow(new Date());
  }, (secondsPerBeat * 1000) / 100);

  const { beats, isoDate } = dateToBeats(now);

  return (
    <div>
      <Head>
        <title>{title} | Beats.wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell title={title}>
        {false && (
          <P>
            The way you tell time was broken with the invention of the internet.
            I'll show you what I mean.
          </P>
        )}
        <P>
          Right now in your local timezone—
          {now.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1]}—it's{" "}
          <b>
            {format(now, "eeee, LLLL do yyyy")} at {format(now, "h:mm a")}
          </b>
          .
        </P>
        <P>
          Translated to Swatch®{" "}
          <span className="bg-red-500 rounded text-white p-1">.Beats</span>{" "}
          time, right now it's <b>{isoDate}</b> at precisely:
        </P>
        <div className="text-4xl md:text-6xl font-bold text-center font-mono">
          @{beats}
        </div>
        <P>
          Unlike your local time, its{" "}
          <span className="font-mono">
            {isoDate} @{beats}
          </span>{" "}
          all over the world right now. There are no confusing{" "}
          <Highlight>time zones</Highlight> or
          <Highlight>daylight savings time shifts</Highlight> to worry about.
        </P>
      </Shell>
    </div>
  );
}
