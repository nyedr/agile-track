import Link from "next/link";
import Icons from "@/components/Icons";

const NewProject = ({}) => {
  return (
    <Link
      href="projects/new"
      className="block max-w-xs p-6 mx-auto space-y-3 bg-white rounded-lg shadow-lg group ring-1 ring-slate-900/5 hover:bg-sky-500 hover:ring-sky-500"
    >
      <div className="flex items-center space-x-3">
        <Icons.FolderAdd className="w-6 h-6 stroke-sky-500 group-hover:stroke-white" />
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-white">
          New project
        </h3>
      </div>
      <p className="text-sm text-slate-500 group-hover:text-white">
        Create a new project from a variety of starting templates.
      </p>
    </Link>
  );
};

export default NewProject;
