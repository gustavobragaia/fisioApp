import { EmptyState } from "@/components/EmptyState";
import { DiagnosticHistorySection } from "@/components/profile/DiagnosticHistorySection";
import { DiagnosticItem } from "@/types/profile";
import React from "react";
import { View } from "react-native";
import { Loading } from "../Loading";

interface HistoryTabProps {
  diagnosticHistory: DiagnosticItem[];
  isLoading: boolean;
}

export function HistoryTab({ diagnosticHistory, isLoading }: HistoryTabProps) {
  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (diagnosticHistory.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <EmptyState title="Nenhum diagnóstico encontrado" variant="sad" />
      </View>
    );
  }

  return (
    <View className="flex-1 mt-6">
      <DiagnosticHistorySection diagnosticHistory={diagnosticHistory} />
    </View>
  );
}
