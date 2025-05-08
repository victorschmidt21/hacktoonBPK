interface DownloadButtonProps {
  url: string | undefined;
}
export function DownloadButton({ url }: DownloadButtonProps) {
  return (
    <a
      download={url}
      className="px-8 py-1 rounded-lg bg-[#243444] text-white cursor-pointer hover:scale-105"
    >
      Download artigo
    </a>
  );
}
