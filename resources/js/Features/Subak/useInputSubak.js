import { useInputMapStore } from "@/Store/useInputMapStore";
import { ToastTopEnd } from "@/Utils/alert";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function useInputSubak(setOpenModal, isUpdate, subak) {
  const { locationInput, addressInput, setLocationInput, setAddressInput } = useInputMapStore(
    useShallow((state) => (
      {
        locationInput: state.locationInput,
        addressInput: state.addressInput,
        setLocationInput: state.setLocationInput,
        setAddressInput: state.setAddressInput,
      }
    )),
  );

  const initialFormData = {
    subak_name: '',
    address: '',
    location: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(initialFormData);

  useEffect(() => {
    if (isUpdate && subak) {
      setFormData({
        subak_name: subak?.subak_name ?? '',
        address: subak?.address ?? '',
        location: subak?.location ?? '',
      });
    }

    // set location and address from global state maps
    if (locationInput && addressInput) {
      setFormData(
        {
          ...formData,
          location: locationInput,
          address: addressInput
        }
      );
    }
  }, [isUpdate, subak, locationInput, addressInput]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: isUpdate ? 'PUT' : 'POST',
        url: `/subaks${isUpdate ? '/' + subak?.id : ''}`,
        data: formData
      });

      const { status, data } = response;
      const { message, errors } = data;

      if (status === 200 || 201) {
        ToastTopEnd.fire({
          icon: "success",
          title: message,
        });
        setFormData(initialFormData);
        setErrors(initialFormData);
        setOpenModal(false);
        setLocationInput(null);
        setAddressInput(null);
        router.reload();
      } else {
        ToastTopEnd.fire({
          icon: "error",
          title: message,
        });
        setErrors(errors || {});
      }
    } catch (error) {
      if (error.response) {
        const { message, errors } = error.response.data;
        ToastTopEnd.fire({
          icon: "error",
          title: message || 'Terjadi kesalahan.',
        });
        setErrors(errors || {});
      } else {
        ToastTopEnd.fire({
          icon: "error",
          title: 'Terjadi kesalahan.' + error,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit
  };
}
