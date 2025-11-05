export default function LinkCard({ data }) {
  const { url, title, summary, favicon, error } = data;

  return (
    <div className="p-5 rounded-2xl border bg-white/60 backdrop-blur-md shadow-sm hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-2">
        <img src={favicon} alt="icon" className="w-6 h-6 rounded-sm" />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-700 hover:underline break-all truncate"
        >
          {title || url}
        </a>
      </div>
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
          {summary}
        </p>
      )}
      <div className="flex justify-end mt-2">
        <button
          onClick={() =>
            navigator.clipboard.writeText(`**${title || url}**\n${summary}`)
          }
          name="copy"
          className="text-xs text-indigo-600 hover:underline"
        >
          Copy Markdown
        </button>
      </div>
    </div>
  );
}
