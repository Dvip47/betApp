"use client";
import { Suspense } from "react";
import ControlPanel from "./(u)/control/ControlPanel";

export default function page() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ControlPanel/>
    </Suspense>
  );
}
