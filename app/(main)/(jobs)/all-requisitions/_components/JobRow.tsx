
import { Pencil, Trash2, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugifyJob } from "@/utils/slugify";
import Link from "next/link";


export type JobStatus = "Active" | "Paused" | "Draft" | "Closed";

export interface Job {
  id: string;
  title: string;
  location: string;
  applicants: number;
  status: JobStatus;
  postedOn: string; // ISO or "Not yet published"
}


interface JobRowProps {
  job: Job;
}

export default function JobRow({ job }: JobRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "Paused": return "bg-yellow-100 text-yellow-700";
      case "Draft": return "bg-blue-100 text-blue-700";
      case "Closed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3"><input type="checkbox" /></td>
      <td className="px-4 py-3 font-semibold text-violet-600">
        <Link
          href={`/my-requisitions/${slugifyJob(job.id, job.title)}`}
          className="hover:underline"
        >
          {job.title}
        </Link>
      </td>
      <td className="px-4 py-3">{job.location}</td>
      <td className="px-4 py-3">{job.applicants}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
          {job.status}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-500">{job.postedOn}</td>
      <td className="px-4 py-3 flex gap-2">
        <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-500" /></Button>
        <Button variant="ghost" size="icon"><Share2 className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
      </td>
    </tr>
  );
}