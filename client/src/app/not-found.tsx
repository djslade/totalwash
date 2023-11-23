import {
  Header,
  LazyImage,
  Navbar,
  PageWrapper,
  SectionWrapper,
} from "@/components";
import { Footer } from "@/components/Footer";
import { Category } from "@/types";
import Link from "next/link";
import React from "react";

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges`);
  const data = await res.json();
  return data?.ranges as Category[];
};

const NotFound = async () => {
  const query = await getCategories();

  const categories = query.filter((category) => category.parents.length === 0);

  const subcategories = query.filter((category) => category.parents.length > 0);

  return (
    <>
      <Header categories={categories} subcategories={subcategories} />
      <Navbar categories={categories} subcategories={subcategories} />
      <PageWrapper>
        <SectionWrapper>
          <div className="flex flex-col items-center gap-3">
            <LazyImage
              source="/notfound.webp"
              alt="Not Found"
              classNames="max-w-sm w-full mb-5"
            />
            <h1 className="text-3xl font-medium">Page Not Found</h1>
            <h2 className="text-lg text-center">
              The page that you&apos;re looking for may have been moved, or it
              may have never existed to begin with.
            </h2>
            <Link
              href="/catalog"
              className="nav-button"
            >
              Return to Store
            </Link>
          </div>
        </SectionWrapper>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default NotFound;
