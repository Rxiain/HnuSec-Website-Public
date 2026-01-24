import { getAllCategoryDocs } from "@/lib/docs"
import ClientRecruitmentPage from "./client-page"

export default function Recruitment2026Page() {
    const materials = getAllCategoryDocs()

    return <ClientRecruitmentPage materials={materials} />
}
