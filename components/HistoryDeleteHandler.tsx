import ConfirmModal from '@/components/delete-confirm-modal';
import { useHistory } from '@/contexts/historyContext';
import React, { useState } from 'react';
import { Alert } from 'react-native';

type Props = {
  trigger?: (actions: {
    deleteSingle: (id: number) => void;
    deleteAll: () => void;
  }) => React.ReactNode;
};

const HistoryDeleteHandler = ({ trigger }: Props) => {
  const { history, deleteHistory, deleteAllHistory } = useHistory();

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteType, setDeleteType] = useState<'single' | 'all' | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const deleteSingle = (id: number) => {
    setSelectedId(id);
    setDeleteType('single');
    setModalVisible(true);
  };

  const deleteAll = () => {
    if (!history || history.length === 0) {
      Alert.alert('No Data', 'No history to delete.');
      return;
    }
    setDeleteType('all');
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteType === 'single' && selectedId !== null) {
      await deleteHistory(selectedId);
    }

    if (deleteType === 'all') {
      await deleteAllHistory();
    }

    setModalVisible(false);
    setDeleteType(null);
    setSelectedId(null);
  };

  return (
    <>
      {trigger?.({
        deleteSingle,
        deleteAll,
      })}

      <ConfirmModal
        visible={modalVisible}
        confirmText={
          deleteType === 'all'
            ? 'Are you sure you want to delete ALL history records?'
            : 'Are you sure you want to delete this history record?'
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setModalVisible(false);
          setDeleteType(null);
          setSelectedId(null);
        }}
      />
    </>
  );
};

export default HistoryDeleteHandler;