import React, { useRef, useState } from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';

import useWorkGroup from '../../hooks/useWorkGroup';
import { ProjectWorkPropsContainer } from '../../c2gin/lowdb';
import WorkGroupModal from './work-group-modal';
import { GroupColors } from '../../c2gin/colors';

type RenameWorkGroupHandlerProps = {
  work: ProjectWorkPropsContainer;
};

export default function RenameWorkGroupHandler({
  work,
}: RenameWorkGroupHandlerProps) {
  const [open, setOpen] = useState(false);

  const { dispatch } = useWorkGroup();

  const inputGroupNameRef = useRef<HTMLInputElement>(null);
  const inputGroupDescriptionRef = useRef<HTMLInputElement>(null);
  const inputSelectTheme = useRef<HTMLSelectElement>(null);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handleRenameGroup = () => {
    const color = inputSelectTheme.current?.value || 'default';

    const group = {
      title: inputGroupNameRef.current?.value || '',
      description: inputGroupDescriptionRef.current?.value || '',
      color: GroupColors[color],
    };

    dispatch({ type: 'edit', id: work.id, new: group });

    closeModal();
  };
  return (
    <>
      <button type="button" onClick={openModal}>
        <PencilAltIcon className="h-5 w-5 ml-1" />
      </button>

      <WorkGroupModal
        open={open}
        closeModal={closeModal}
        inputGroupNameRef={inputGroupNameRef}
        inputGroupDescriptionRef={inputGroupDescriptionRef}
        nameDefValue={work.title}
        descriptionDefValue={work.description}
        selectThemeRef={inputSelectTheme}
        selectThemeDefValue={work.color?.key || 'default'}
        dialogTitle="Rename work category"
      >
        <button
          type="button"
          className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
          onClick={handleRenameGroup}
        >
          Rename WorkGroup
        </button>
      </WorkGroupModal>
    </>
  );
}
