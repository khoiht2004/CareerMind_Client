import { useState, useCallback } from "react";

export function useChatActions({ sessionTitle, onRename, onDelete }) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openRename = useCallback(() => {
    setRenameValue(sessionTitle ?? "");
    setRenameOpen(true);
  }, [sessionTitle]);

  const closeRename = useCallback(() => setRenameOpen(false), []);

  const submitRename = useCallback(async () => {
    await onRename(renameValue);
    setRenameOpen(false);
  }, [onRename, renameValue]);

  const handleRenameKeyDown = useCallback(
    (e) => e.key === "Enter" && submitRename(),
    [submitRename],
  );

  const openDelete = useCallback(() => setDeleteOpen(true), []);
  const closeDelete = useCallback(() => setDeleteOpen(false), []);

  const confirmDelete = useCallback(async () => {
    await onDelete();
    setDeleteOpen(false);
  }, [onDelete]);

  return {
    rename: {
      open: renameOpen,
      value: renameValue,
      setOpen: setRenameOpen,
      setValue: setRenameValue,
      handleOpen: openRename,
      handleClose: closeRename,
      handleSubmit: submitRename,
      handleKeyDown: handleRenameKeyDown,
    },
    delete: {
      open: deleteOpen,
      setOpen: setDeleteOpen,
      handleOpen: openDelete,
      handleClose: closeDelete,
      handleConfirm: confirmDelete,
    },
  };
}
