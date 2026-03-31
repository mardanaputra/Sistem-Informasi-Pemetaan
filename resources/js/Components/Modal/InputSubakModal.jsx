import useInputSubak from "@/Features/Subak/useInputSubak";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import MapsInput from "../Map/MapInput";

export function InputSubakModal({ trigger, isUpdate, data }) {
    const [openModal, setOpenModal] = useState(false);
    const { formData, isSubmitting, errors, handleChange, handleSubmit } =
        useInputSubak(setOpenModal, isUpdate, data);

    return (
        <>
            <div className="cursor-pointer" onClick={() => setOpenModal(true)}>
                {trigger}
            </div>
            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                size="4xl"
            >
                <Modal.Header>
                    {isUpdate ? "Edit Subak" : "Tambah Subak"}
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-3"
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="subak_name"
                                    value="Nama Subak*"
                                    color={
                                        errors.subak_name ? "failure" : "gray"
                                    }
                                />
                            </div>
                            <TextInput
                                id="subak_name"
                                name="subak_name"
                                type="text"
                                placeholder="Masukan nama subak..."
                                value={formData.subak_name}
                                onChange={handleChange}
                                color={errors.subak_name ? "failure" : "gray"}
                                helperText={errors.subak_name}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="address"
                                    value="Alamat"
                                    color={errors.address ? "failure" : "gray"}
                                />
                            </div>
                            <Textarea
                                rows={4}
                                id="address"
                                name="address"
                                placeholder="Masukan alamat..."
                                value={formData.address}
                                onChange={handleChange}
                                color={errors.address ? "failure" : "gray"}
                                helperText={errors.address}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="location"
                                    value="Location (Coordinates)*"
                                    color={errors.location ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="location"
                                name="location"
                                type="text"
                                placeholder="Masukan location..."
                                value={formData.location}
                                onChange={handleChange}
                                color={errors.location ? "failure" : "gray"}
                                helperText={errors.location}
                            />
                        </div>
                        <div>
                            <MapsInput
                                key={"default"}
                                mapsHeight="h-96 md:h-[580px]"
                                isUpdate={isUpdate}
                                popUpContent={`<p>${data?.subak_name ?? ""}</p>`}
                                location={
                                    data?.location
                                        ? typeof data.location === "string"
                                            ? JSON.parse(data.location)
                                            : data.location
                                        : null
                                }
                            />
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                Simpan
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
