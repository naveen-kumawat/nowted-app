import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { FolderTypes, NoteTypes } from '@/types';

export const DEFAULT_NOTES: NoteTypes = {
  id_note: uuid(),
  name: 'lets making story',
  content: 'Our Story......',
};

export type folderStateType = {
  folders: FolderTypes[];
  addFolder: (data: Pick<FolderTypes, 'name'>) => void;
  updateFolder: (data: Pick<FolderTypes, 'id_folder' | 'name'>) => void;
  removeFolder: (data: Pick<FolderTypes, 'id_folder'>) => void;
};

export const useFolder = create<folderStateType>()(
  persist(
    (set) => ({
      folders: [
        {
          id_folder: uuid(),
          name: 'Personal',
          notes: [DEFAULT_NOTES],
        },
      ],
      addFolder: (data) => {
        set((state) => {
          return {
            folders: [
              ...state.folders,
              {
                id_folder: uuid(),
                name: data.name,
                notes: [DEFAULT_NOTES],
              },
            ],
          };
        });
      },
      updateFolder: (data) => {
        set((state) => {
          return {
            folders: state.folders.map((item) =>
              item.id_folder === data.id_folder
                ? { ...item, name: data.name }
                : item
            ),
          };
        });
      },
      removeFolder: (data) => {
        set((state) => {
          return {
            folders: state.folders.filter(
              (item) => item.id_folder !== data.id_folder
            ),
          };
        });
      },
    }),
    {
      name: 'folder-notes',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
