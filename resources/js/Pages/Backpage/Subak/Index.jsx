import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import DataLoading from "@/Components/Loading/DataLoading";
import { InputSubakModal } from "@/Components/Modal/InputSubakModal";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import { PER_PAGES } from "@/Constants/dataOptions";
import useDeleteSubak from "@/Features/Subak/useDeleteSubak";
import useGetSubaks from "@/Features/Subak/useGetSubaks";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { Link } from "@inertiajs/react";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { FaEdit, FaInfoCircle, FaTrashAlt } from "react-icons/fa";

export default function SubakPage() {
    const {
        subaks,
        searchValue,
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
    } = useGetSubaks();

    const { deleteDataConfirm } = useDeleteSubak();

    return (
        <BackpageLayout>
            <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:gap-2">
                <Select
                    defaultValue={perpage.current}
                    onChange={handleChangePerPage}
                    id="per-page"
                    required
                    className="min-w-20 max-w-20"
                >
                    {PER_PAGES.map((perPage) => (
                        <option key={perPage} value={perPage}>
                            {perPage}
                        </option>
                    ))}
                </Select>
                <TextInput
                    id="base"
                    type="search"
                    placeholder="Cari subak..."
                    sizing="md"
                    className="w-full"
                    defaultValue={searchValue}
                    onChange={debouncedHandleSearch}
                />
                <InputSubakModal
                    trigger={
                        <Button className="text-nowrap">Tambah Data</Button>
                    }
                />
            </div>
            <div className="mt-4 overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell className="w-5">#</Table.HeadCell>
                        <Table.HeadCell>Nama Subak</Table.HeadCell>
                        <Table.HeadCell>Alamat</Table.HeadCell>
                        <Table.HeadCell className="flex items-center justify-center">
                            Aksi
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {!isLoading &&
                            subaks.data.map((subak, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="w-5 whitespace-nowrap font-medium text-gray-900">
                                        {(subaks.current_page - 1) *
                                            subaks.per_page +
                                            index +
                                            1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {subak.subak_name}
                                    </Table.Cell>
                                    <Table.Cell>{subak.address}</Table.Cell>
                                    <Table.Cell className="flex items-center justify-center gap-4">
                                        <Link href={`/subaks/${subak.id}`}>
                                            <button>
                                                <FaInfoCircle className="size-6 text-green-500" />
                                            </button>
                                        </Link>
                                        <InputSubakModal
                                            trigger={
                                                <button>
                                                    <FaEdit className="size-5 text-blue-500" />
                                                </button>
                                            }
                                            isUpdate
                                            data={subak}
                                        />
                                        <button
                                            onClick={() =>
                                                deleteDataConfirm(subak.id)
                                            }
                                        >
                                            <FaTrashAlt className="size-5 text-red-500" />
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
                {isLoading && <DataLoading />}
                {subaks.data.length <= 0 && !isLoading && <DataNotFoundError />}
            </div>
            {subaks.data.length > 0 && !isLoading && (
                <ListDataPagination
                    data={subaks}
                    params={{
                        perpage: perpage.current || 10,
                        search: searchValue || "",
                    }}
                />
            )}
        </BackpageLayout>
    );
}
