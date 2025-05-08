import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface EventAttributes {
  evento_id: number;
  img_url_evento: string;
  title: string;
  description: string;
  dt_start: string;
  dt_end: string;
  status: string;
  updated_at: string;
  created_at: string;
}

const EventCreationPage = () => {
  const navigate = useNavigate();

  // Form state
  const [eventData, setEventData] = useState<Partial<EventAttributes>>({
    title: "",
    description: "",
    dt_start: "",
    dt_end: "",
    status: "",
    img_url_evento: "",
  });

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.img_url_evento) {
        setErrors({
          ...errors,
          img_url_evento: "",
        });
      }
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!eventData.title?.trim()) {
      newErrors.title = "O título é obrigatório";
    }

    if (!eventData.description?.trim()) {
      newErrors.description = "A descrição é obrigatória";
    }

    if (!eventData.dt_start) {
      newErrors.dt_start = "A data de início é obrigatória";
    }

    if (!eventData.dt_end) {
      newErrors.dt_end = "A data de término é obrigatória";
    } else if (
      eventData.dt_start &&
      new Date(eventData.dt_end) < new Date(eventData.dt_start)
    ) {
      newErrors.dt_end =
        "A data de término deve ser posterior à data de início";
    }

    if (!imageFile && !eventData.img_url_evento) {
      newErrors.img_url_evento = "Uma imagem para o evento é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNavigate = () => {
    navigate("/admin");
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      // In a real application, you would upload the image and submit the form data to your API
      console.log("Form data submitted:", eventData);
      console.log("Image file:", imageFile);

      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setEventData({
          title: "",
          description: "",
          dt_start: "",
          dt_end: "",
          status: "Rascunho",
          img_url_evento: "",
        });
        handleNavigate();
        setImageFile(null);
        setImagePreview(null);
        setSubmitSuccess(false);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-[#243444] text-white">
            <h3 className="text-lg font-medium leading-6">Criar Novo Evento</h3>
            <p className="mt-1 text-sm opacity-90">
              Preencha os dados abaixo para criar um novo evento.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-6">
              <div className="rounded-md bg-green-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Evento criado com sucesso!
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Seu evento foi criado e está disponível agora.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Informações Básicas
                </h4>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Título do Evento *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={eventData.title}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full py-2 px-3 border ${
                        errors.title ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-[#243444] focus:border-[#243444]`}
                      placeholder="Workshop de Desenvolvimento Web"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descrição *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={eventData.description}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full py-2 px-3 border ${
                        errors.description
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-[#243444] focus:border-[#243444]`}
                      placeholder="Descreva o evento em detalhes. Você pode usar quebras de linha para melhor formatação."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Imagem do Evento
                </h4>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Imagem de Capa *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <div className="mb-4">
                            <img
                              src={imagePreview}
                              alt="Image preview"
                              className="mx-auto h-40 object-cover rounded-md"
                            />
                          </div>
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#243444] hover:text-[#3a556f] focus-within:outline-none"
                          >
                            <span>
                              {imagePreview
                                ? "Alterar imagem"
                                : "Fazer upload de imagem"}
                            </span>
                            <input
                              id="image-upload"
                              name="image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          {!imagePreview && (
                            <p className="pl-1">ou arraste e solte</p>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF até 10MB
                        </p>
                      </div>
                    </div>
                    {errors.img_url_evento && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.img_url_evento}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Data e Hora
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  <div>
                    <label
                      htmlFor="dt_start"
                      className="block text-sm font-medium text-gray-700 select-none"
                    >
                      Data e Hora de Início *
                    </label>
                    <input
                      type="datetime-local"
                      name="dt_start"
                      id="dt_start"
                      value={eventData.dt_start}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full py-2 px-3 border ${
                        errors.dt_start ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-[#243444] focus:border-[#243444]`}
                    />
                    {errors.dt_start && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.dt_start}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="dt_end"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Data e Hora de Término *
                    </label>
                    <input
                      type="datetime-local"
                      name="dt_end"
                      id="dt_end"
                      value={eventData.dt_end}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full py-2 px-3 border ${
                        errors.dt_end ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none     focus:ring-[#243444] focus:border-[#243444]`}
                    />
                    {errors.dt_end && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.dt_end}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                  onClick={handleNavigate}
                    type="button"
                    className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#243444]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#243444] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#243444] ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Criando...
                      </>
                    ) : (
                      "Criar Evento"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EventCreationPage;
