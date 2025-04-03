/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-[100dvh] max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <Image
            src="/logo.png"
            alt="Is This True? Logo"
            width={120}
            height={120}
          />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Is This True?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl text-balance">
            A simple Chrome extension that lets you fact-check text on any
            webpage with a quick right-click. Get instant AI-powered
            verification without leaving the page.
          </p>
          <Button
            size="lg"
            onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/is-this-true/hafbidloddepnejalikmidkefhpielee",
                "_blank"
              )
            }
            className="animate-bounce"
          >
            <Image
              src="/chrome-web-store.png"
              alt="Available in the Chrome Web Store"
              width={24}
              height={24}
              className="mr-2"
            />
            Add to Chrome
          </Button>
        </div>
      </div>

      {/* How It Works */}
      <section className="px-4 space-y-16 mb-24">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>

        <div className="grid md:grid-cols-2 gap-16">
          <CustomCard
            imgPath="/step-1.png"
            imgAlt="Highlight text to fact-check"
            title="1. Highlight Text"
            description="Select any text you want to fact-check on any webpage."
            stepNumber="01"
          />

          <CustomCard
            imgPath="/step-2.png"
            imgAlt="Right-click menu"
            title="2. Right-Click"
            description='Right-click the selected text and choose "Is this true?" from the menu.'
            stepNumber="02"
          />

          <CustomCard
            imgPath="/step-3.png"
            imgAlt="Get instant verification"
            title="3. Get Instant Verification"
            description="Receive an AI-powered assessment of the claim's accuracy with relevant context."
            stepNumber="03"
          />

          <CustomCard
            imgPath="/step-4.jpg"
            imgAlt="Make informed decisions"
            title="4. Make Informed Decisions"
            description="Use the verification results to better understand the information and make informed decisions."
            stepNumber="04"
          />
        </div>
      </section>

      {/* Feedback Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-2xl mx-auto text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Feedback?</h2>
          <p className="text-muted-foreground mb-6">
            We&apos;d love to hear how it works for you! Reach out to Nathan
            Young on{" "}
            <a
              href="https://x.com/NathanpmYoung"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              X @NathanpmYoung
            </a>{" "}
            with bugs, suggestions, or anything else.
          </p>
          <Button
            variant="default"
            onClick={() => window.open("https://x.com/NathanpmYoung", "_blank")}
          >
            Contact on X
          </Button>
        </div>
      </section>
    </main>
  );
}

function CustomCard({
  imgPath,
  imgAlt,
  title,
  description,
  children,
  stepNumber,
}: {
  imgPath: string;
  imgAlt: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  stepNumber: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute -left-4 -top-4 text-4xl font-bold text-neutral-100 select-none transition-transform group-hover:scale-110 duration-300">
        {stepNumber}
      </div>
      <div className="space-y-6">
        <div className="relative w-full aspect-[4/3] border border-neutral-300 rounded-lg shadow overflow-hidden mx-auto transition-transform group-hover:scale-105 duration-300">
          <img
            src={imgPath}
            alt={imgAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
