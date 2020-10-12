import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Shell from "../components/Shell";

export default function TimePage({}) {
  const router = useRouter();
  const { time } = router.query;

  const title = `${time} in Swatch® .beats`;

  const beats = parseFloat(time.replace(/[^0-9.]/, ""));

  return (
    <div>
      <Head>
        <title>{title} | Beats.wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell title={title}>
        {time} in Swatch® .beat Internet Time is {beats}
      </Shell>
    </div>
  );
}
