import React from 'react';
import { Dialog } from 'heroui-native';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  return (
    <Dialog isOpen={visible} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Close />
          {title ? <Dialog.Title>{title}</Dialog.Title> : null}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
