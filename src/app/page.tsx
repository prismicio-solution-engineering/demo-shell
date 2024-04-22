import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/index"
import Header from "@/components/Header";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default async function Page({ }) {
  const client = createClient();

  const page = await client.getSingle("homepage");
  const header = await client.getSingle("header");

  return(
  <>
    <Header {...header}/>
    <SliceZone slices={page.data.slices} components={components}/>;
  </>
  )
}