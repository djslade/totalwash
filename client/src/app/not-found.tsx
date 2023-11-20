import { Header, LazyImage, Navbar } from "@/components";
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
      <main className="h-full max-w-screen-lg flex justify-center items-center mx-auto gap-6 my-6">
        <section className="max-w-sm flex flex-col items-center gap-3 p-3">
          <LazyImage
            source="/notfound.webp"
            alt="Not Found"
            classNames="max-w-sm w-full mb-5"
          />
          <h1 className="text-3xl font-medium">Page Not Found</h1>
          <h2 className="text-lg text-center">
            The page that you&apos;re looking for may have been moved, or it may
            have never existed to begin with.
          </h2>
          <Link
            href="/catalog"
            className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium hover:bg-gray-200 focus:bg-gray-200 transition-all w-max px-3"
          >
            Return to Store
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
