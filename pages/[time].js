import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { formatISO9075, format, formatDistanceToNow } from "date-fns";

import Head from "next/head";
import Shell from "../components/Shell";

import { beatsToDate, dateToBeats, localTimezone } from "../utils";

import { P, Highlight, Showcase } from "../components/html";

export default function TimePage({}) {
  const router = useRouter();
  let { time } = router.query;

  const beats = time ? parseFloat(time.replace(/[^0-9.]/, "")) : 0;
  const title = `@${beats} in Swatch® .beats`;

  const localTime = beatsToDate(beats);

  return (
    <div>
      <Head>
        <title>{title} | Beats.wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell title={title}>
        <P>
          @{beats} in Swatch® .Beat Internet Time translated to your current
          local timezone of {localTimezone()} is:
        </P>
        <Showcase>{format(localTime, "h:mm:ss a")}</Showcase>
      </Shell>
    </div>
  );
}
