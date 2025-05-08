interface DownloadButtonProps {
  url: string | undefined;
}
export function DownloadButton({ url }: DownloadButtonProps) {
  return (
    <a
      href={url}
      download="artigo.pdf"
      className="px-8 py-1 rounded-lg bg-[#243444] text-white cursor-pointer hover:scale-105"
    >
      Download artigo
    </a>
  );
}
