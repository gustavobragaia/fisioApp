import { Button } from "@/components/Button";
import colors from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "react-native-toast-notifications";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatar: string;
  nextAvailable: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  professionalId: string;
}

interface AppointmentScreenProps {
  navigation?: any;
  userName?: string;
}

const AppointmentScreen: React.FC<AppointmentScreenProps> = ({
  navigation,
  userName = "João",
}) => {
  const [currentStep, setCurrentStep] = useState<
    "selection" | "professionals" | "calendar" | "confirmation"
  >("professionals");
  const [selectedSpecialty, setSelectedSpecialty] = useState<
    "psicologo" | "fisioterapeuta" | null
  >("psicologo");
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Mock data for professionals
  const psychologists: Professional[] = [
    {
      id: "psi_1",
      name: "Dra. Maria Silva",
      specialty: "Psicologia Organizacional",
      rating: 4.9,
      avatar: "👩‍⚕️",
      nextAvailable: "Hoje às 14:00",
    },
    {
      id: "psi_2",
      name: "Dr. Carlos Oliveira",
      specialty: "Psicologia Clínica",
      rating: 4.8,
      avatar: "👨‍⚕️",
      nextAvailable: "Amanhã às 09:00",
    },
    {
      id: "psi_3",
      name: "Dra. Ana Costa",
      specialty: "Terapia Cognitiva",
      rating: 4.9,
      avatar: "👩‍⚕️",
      nextAvailable: "Hoje às 16:30",
    },
  ];

  const physiotherapists: Professional[] = [
    {
      id: "fisio_1",
      name: "Dr. Roberto Santos",
      specialty: "Fisioterapia do Trabalho",
      rating: 4.7,
      avatar: "👨‍⚕️",
      nextAvailable: "Hoje às 15:00",
    },
    {
      id: "fisio_2",
      name: "Dra. Lucia Pereira",
      specialty: "Reabilitação Postural",
      rating: 4.8,
      avatar: "👩‍⚕️",
      nextAvailable: "Amanhã às 10:30",
    },
    {
      id: "fisio_3",
      name: "Dr. Felipe Lima",
      specialty: "Ergonomia",
      rating: 4.6,
      avatar: "👨‍⚕️",
      nextAvailable: "Hoje às 17:00",
    },
  ];

  // Mock time slots for selected date and professional
  const getAvailableSlots = (): TimeSlot[] => [
    {
      id: "1",
      time: "09:00",
      available: true,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "2",
      time: "09:30",
      available: false,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "3",
      time: "10:00",
      available: true,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "4",
      time: "10:30",
      available: true,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "5",
      time: "14:00",
      available: true,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "6",
      time: "14:30",
      available: false,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "7",
      time: "15:00",
      available: true,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "8",
      time: "15:30",
      available: true,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "9",
      time: "16:00",
      available: true,
      professionalId: selectedProfessional?.id || "",
    },
    {
      id: "10",
      time: "16:30",
      available: false,
      professionalId: selectedProfessional?.id || "",
    },
  ];

  const handleSpecialtySelect = (specialty: "psicologo" | "fisioterapeuta") => {
    setSelectedSpecialty(specialty);
    setCurrentStep("professionals");
  };

  const handleProfessionalSelect = (professional: Professional) => {
    setSelectedProfessional(professional);
    setCurrentStep("calendar");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    if (!selectedTime) {
      Toast.show("Por favor, selecione um horário.", {
        type: "warning",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const handleFinalConfirmation = () => {
    Toast.show(
      "Agendamento realizado com sucesso! Você receberá um e-mail de confirmação.",
      {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      }
    );
    setShowConfirmModal(false);
    setCurrentStep("confirmation");
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const renderHeader = () => (
    <View className="bg-white shadow-sm">
      <View className="px-6 py-4 pt-16">
        <View className="flex-row items-center justify-center mb-4">
          <Text className="text-xl font-bold text-gray-800">
            Agende sua Sessão
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSelectionScreen = () => (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-6">
        <ImageBackground
          source={require("@/assets/images/banner-background.png")}
          style={{ flex: 1, paddingVertical: 64 }}
          resizeMode="stretch"
        >
          <View className="absolute inset-0 bg-primary/60" />

          <View className="items-start mb-8">
            <View className="bg-green-100 p-4 rounded-full mb-4">
              <Ionicons name="calendar" size={32} color={colors.primary} />
            </View>
            <Text className="text-3xl font-bold text-white text-center mb-2">
              Olá {userName}!
            </Text>
            <Text className="text-white text-lg">
              Use o calendário abaixo para agendar sua sessão com um de nossos
              especialistas.
            </Text>
          </View>

          <View className="gap-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSpecialtySelect("psicologo")}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-3 rounded-full mr-4">
                  <Text className="text-2xl">🧠</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-800 mb-1">
                    Psicólogo
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Suporte emocional e saúde mental
                  </Text>
                  <Text className="text-primary font-semibold text-sm mt-2">
                    3 especialistas disponíveis
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );

  const renderProfessionalsScreen = () => {
    const professionals =
      selectedSpecialty === "psicologo" ? psychologists : physiotherapists;
    const specialtyTitle =
      selectedSpecialty === "psicologo" ? "Psicólogos" : "Fisioterapeutas";

    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        {renderHeader()}
        <ScrollView className="flex-1 px-6 py-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Escolha seu {specialtyTitle.slice(0, -1)}
          </Text>
          <Text className="text-gray-600 mb-6">
            Selecione o profissional que melhor atende suas necessidades.
          </Text>

          {professionals.map((professional) => (
            <TouchableOpacity
              key={professional.id}
              activeOpacity={0.7}
              onPress={() => handleProfessionalSelect(professional)}
              className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="bg-gray-100 w-16 h-16 rounded-full items-center justify-center mr-4">
                  <Text className="text-2xl">{professional.avatar}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800 mb-1">
                    {professional.name}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-2">
                    {professional.specialty}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={16} color="#fbbf24" />
                      <Text className="text-gray-700 text-sm ml-1 font-medium">
                        {professional.rating}
                      </Text>
                    </View>
                    <Text className="text-primary font-semibold text-sm">
                      {professional.nextAvailable}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };

  const renderCalendarScreen = () => {
    const calendarDays = generateCalendarDays();
    const availableSlots = getAvailableSlots();

    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        {renderHeader()}
        <ScrollView className="flex-1 px-6 py-6">
          <View className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-4">
              <View className="bg-gray-100 w-12 h-12 rounded-full items-center justify-center mr-4">
                <Text className="text-xl">{selectedProfessional?.avatar}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">
                  {selectedProfessional?.name}
                </Text>
                <Text className="text-gray-600 text-sm">
                  {selectedProfessional?.specialty}
                </Text>
              </View>
            </View>
          </View>

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Selecione uma data
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            <View className="flex-row gap-2 px-1">
              {calendarDays.map((day, index) => {
                const isSelected =
                  day.toDateString() === selectedDate.toDateString();
                const isToday =
                  day.toDateString() === new Date().toDateString();

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedDate(day)}
                    className={`items-center p-4 rounded-xl min-w-[70px] ${
                      isSelected
                        ? "bg-primary border-2 border-primary"
                        : isToday
                        ? "bg-green-50 border-2 border-green-200"
                        : "bg-white border-2 border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        isSelected ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {day.toLocaleDateString("pt-BR", { weekday: "short" })}
                    </Text>
                    <Text
                      className={`text-lg font-bold ${
                        isSelected ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {day.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Horários disponíveis para {formatDate(selectedDate)}
          </Text>

          <View className="flex-row flex-wrap gap-3 mb-8">
            {availableSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                onPress={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`py-3 px-6 rounded-xl ${
                  selectedTime === slot.time
                    ? "bg-primary"
                    : slot.available
                    ? "bg-white border-2 border-gray-200"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedTime === slot.time
                      ? "text-white"
                      : slot.available
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title="Confirmar Agendamento"
            onPress={handleConfirmAppointment}
            disabled={!selectedTime}
            className={`py-4 px-6 rounded-xl ${
              selectedTime ? "bg-primary" : "bg-gray-300"
            }`}
          />
        </ScrollView>
      </SafeAreaView>
    );
  };

  const renderConfirmationScreen = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-green-100 p-6 rounded-full mb-8">
          <Ionicons name="checkmark-circle" size={64} color="#16a34a" />
        </View>

        <Text className="text-3xl font-bold text-gray-800 text-center mb-4">
          Agendamento Confirmado!
        </Text>

        <View className="bg-white rounded-xl p-6 w-full mb-8 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4 text-center">
            Detalhes da sua sessão
          </Text>

          <View className="gap-3">
            <View className="flex-row items-center">
              <Ionicons name="person" size={20} color={colors.primary} />
              <Text className="text-gray-800 ml-3 font-medium">
                {selectedProfessional?.name}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <Text className="text-gray-800 ml-3 font-medium capitalize">
                {formatDate(selectedDate)}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="time" size={20} color={colors.primary} />
              <Text className="text-gray-800 ml-3 font-medium">
                {selectedTime}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="videocam" size={20} color={colors.primary} />
              <Text className="text-gray-800 ml-3 font-medium">
                Sessão online via Google Meet
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setCurrentStep("selection");
            setSelectedSpecialty(null);
            setSelectedProfessional(null);
            setSelectedTime(null);
          }}
          className="bg-primary rounded-xl py-4 px-8"
        >
          <Text className="text-white font-bold text-lg">
            Agendar Nova Sessão
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderConfirmModal = () => (
    <Modal
      visible={showConfirmModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowConfirmModal(false)}
    >
      <View className="flex-1 bg-black/50 justify-center px-6">
        <View className="bg-white rounded-2xl p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Confirmar Agendamento
          </Text>

          <View className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Profissional:</Text>
              <Text className="font-semibold text-gray-800">
                {selectedProfessional?.name}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Data:</Text>
              <Text className="font-semibold text-gray-800">
                {formatDate(selectedDate)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Horário:</Text>
              <Text className="font-semibold text-gray-800">
                {selectedTime}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowConfirmModal(false)}
              className="flex-1 bg-gray-200 py-3 rounded-xl"
            >
              <Text className="text-gray-700 text-center font-semibold">
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleFinalConfirmation}
              className="flex-1 bg-primary py-3 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      {currentStep === "selection" && renderSelectionScreen()}
      {currentStep === "professionals" && renderProfessionalsScreen()}
      {currentStep === "calendar" && renderCalendarScreen()}
      {currentStep === "confirmation" && renderConfirmationScreen()}
      {renderConfirmModal()}
    </>
  );
};

export default AppointmentScreen;
