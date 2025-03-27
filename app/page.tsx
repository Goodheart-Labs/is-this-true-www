/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";

interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubReleaseAsset[];
}

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Fetch all releases from GitHub
      const response = await fetch(
        "https://api.github.com/repos/Goodheart-Labs/fact-checking-extension/releases"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch releases");
      }

      const releases: GitHubRelease[] = await response.json();

      if (releases.length === 0) {
        throw new Error("No releases found");
      }

      // Get the most recent release (first in the array)
      const latestRelease = releases[0];

      // Find the extension.chrome.zip asset
      const extensionAsset = latestRelease.assets.find(
        (asset) => asset.name === "extension.chrome.zip"
      );

      if (!extensionAsset) {
        throw new Error("Extension asset not found in the latest release");
      }

      // Create a temporary link to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = extensionAsset.browser_download_url;
      downloadLink.download = "extension.chrome.zip";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error downloading extension:", error);
      alert("Failed to download the extension. Please try again later.");
    } finally {
      setIsDownloading(false);
    }
  };

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
            {/* <span className="text-[#E89250]">(Beta)</span> */}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl text-balance">
            A simple Chrome extension that lets you fact-check text on any
            webpage with a quick right-click. We&apos;re in beta, and we need
            your help testing it!
          </p>
        </div>
      </div>

      {/* Installation Steps */}
      <section className="px-4 space-y-12">
        <h2 className="text-3xl font-bold text-center">
          How to Install <span className="opacity-30">(Chrome Only)</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <CustomCard
            imgPath="/step-1.png"
            imgAlt="Step 1"
            title="1. Enable Developer Mode"
            description="Open Chrome and go to chrome://extensions. Toggle Developer mode in the top right corner."
          />

          <CustomCard
            imgPath="/step-2.png"
            imgAlt="Step 2"
            title="2. Download and Unzip"
            description="Download the extension files and extract/unzip the folder on your computer."
          >
            <Button
              className="w-full"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download Extension"}
            </Button>
          </CustomCard>

          <CustomCard
            imgPath="/step-3.gif"
            imgAlt="Step 3"
            title="3. Install the Extension"
            description='On chrome://extensions, click "Load unpacked" and select the extracted extension folder.'
          />

          <CustomCard
            imgPath="/step-4.png"
            imgAlt="Step 4"
            title="4. Start Fact-Checking"
            description='Visit any webpage, highlight some text, right-click, and select "Is this true?".'
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
}: {
  imgPath: string;
  imgAlt: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="p-0 overflow-hidden rounded-xl border border-neutral-300 shadow">
      <img
        src={imgPath}
        alt={imgAlt}
        className="aspect-[479/338] border-b border-neutral-300"
      />
      <div className="p-6">
        <h3 className="font-bold mb-2 text-lg">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
}
