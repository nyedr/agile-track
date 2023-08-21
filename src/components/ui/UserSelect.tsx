"use client";

import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Icons from "@/components/Icons";
import { useParams } from "next/navigation";
import { User } from "@prisma/client";
import Avatar from "@/ui/Avatar";
import { UseFormRegisterReturn } from "react-hook-form";

interface SimpleProjectMember {
  id: string;
  name: string;
  image: string | null;
}

const dummyData = [
  {
    id: "1",
    name: "John Doe",
    image: null,
  },
  {
    id: "2",
    name: "Jane Doe",
    image: null,
  },
  {
    id: "3",
    name: "John Smith",
    image: null,
  },
];

const UserSelect = ({ ...props }: UseFormRegisterReturn) => {
  const { projectName } = useParams();
  const [filteredProjectMembers, setfilteredProjectMembers] = useState<
    SimpleProjectMember[]
  >([]);
  const [selected, setSelected] = useState<null | SimpleProjectMember>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchFilteredProjectMembers = async () => {
      const response = await fetch(
        `/api/projects/${projectName}/members?username=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const projectMembers: User[] = await response.json();

      const filteredProjectMembers = projectMembers.map((member: User) => ({
        id: member.id,
        name: member.username,
        image: member?.image,
      }));

      setfilteredProjectMembers(
        filteredProjectMembers.length ? filteredProjectMembers : dummyData
      );
    };

    fetchFilteredProjectMembers();
  }, [query, projectName]);

  return (
    <div className="fixed top-16 w-72">
      <Combobox {...props} value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden text-left rounded-lg shadow-md cursor-default bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 border-none text-primary-text focus:ring-0"
              displayValue={(member: SimpleProjectMember) =>
                member?.name ?? "Placeholder"
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Icons.ChevronUpDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-background max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredProjectMembers.length === 0 && query !== "" ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  Nothing found.
                </div>
              ) : (
                filteredProjectMembers.map((member) => (
                  <Combobox.Option
                    key={member?.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary-color text-white" : "text-gray-900"
                      }`
                    }
                    value={member}
                  >
                    {({ selected, active }) => (
                      <div
                        className={`flex items-center gap-3 w-full ${
                          selected ? "bg-light-shade" : ""
                        }`}
                      >
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {member?.name}
                        </span>
                        <Avatar
                          alt={member?.name}
                          src={
                            member?.image ??
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                        />
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default UserSelect;
