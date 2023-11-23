import { PageWrapper, SectionWrapper } from "@/components";
import React from "react";
import { PulseLoader } from "react-spinners";

const loading = () => {
  return (
    <PageWrapper>
      <SectionWrapper>
        <div className="mx-auto max-w-screen-lg w-screen h-screen flex justify-center items-center p-3">
          <PulseLoader size={24} />
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default loading;
