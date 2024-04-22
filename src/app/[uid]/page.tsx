import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/index"
import Header from "@/components/Header";
import { Metadata } from "next";
import { notFound } from "next/navigation";


type PageParams = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", params.uid)
  .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page")
    .catch(() => notFound());

  const uids = pages.map((page) => {return {uid:page.uid}});
  
  return uids
}

export default async function Page({
  params,
}: {
  params: PageParams;
}) {
  const client = createClient();

  const page = await client.getByUID("page", params.uid)
    .catch(() => notFound());
  const header = await client.getSingle("header");

  return (
    <>
      <Header {...header} />
      <SliceZone slices={page.data.slices} components={components} />;
    </>
  )
}