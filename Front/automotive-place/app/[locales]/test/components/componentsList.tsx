import { CarItem } from "@/app/components/carItem";
import { CreateCarItemView } from "@/app/components/createCarItem";
import { CreatePostView } from "@/app/components/createPost";
import { CreateProblemView } from "@/app/components/createProblem";
import { CreateProjectView } from "@/app/components/createProject";
import { CreateSpotView } from "@/app/components/createSpot";
import { AMPButton } from "@/app/components/shared/AMPButton";
import { AMPFooterItem } from "@/app/components/shared/AMPFooterItem";
import { AMPHelpFooter } from "@/app/components/shared/AMPHelpFooter";
import { AMPInput } from "@/app/components/shared/AMPInput";
import { AMPMenu } from "@/app/components/shared/AMPMenu";
import { AMPSearch } from "@/app/components/shared/AMPSearch";
import { AMPSelect } from "@/app/components/shared/AMPSelect";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import { AMPSwitch } from "@/app/components/shared/AMPSwitch";
import { AMPTextarea } from "@/app/components/shared/AMPTextarea";
import { carItemData } from "@/app/utils/data";
import { Md1kPlus } from "react-icons/md";

export const componentsList = [
  {
    name: "CarItem",
    value: (
      <CarItem data={carItemData} isLoading={false} tableView="elements" />
    ),
    description:
      "Komponent który pokazuje pojedyńczy element samochodu, podzespół, jakąś część",
  },
  {
    name: "createCarItem",
    value: <CreateCarItemView />,
    description:
      "Widok który daje możliwość dodania do bazy elementu, część samochodowej",
  },
  {
    name: "createProblem",
    value: <CreateProblemView />,
    description: "Widok który daje możliwość dodania do bazy problemów",
  },
  {
    name: "createProject",
    value: <CreateProjectView />,
    description: "Widok który daje możliwość dodania do bazy projektu",
  },
  {
    name: "createSpot",
    value: <CreateSpotView />,
    description: "Widok który daje możliwość dodania do bazy spotu",
  },
  {
    name: "createPost",
    value: <CreatePostView />,
    description: "Widok który daje możliwość dodania do bazy post",
  },
  {
    name: "AMPButton",
    value: <AMPButton name="Nazwa" onClick={() => {}} />,
    description: "Customowy przycisk",
  },
  {
    name: "AMPFooterItem",
    value: (
      <AMPFooterItem
        data={{ createdAt: new Date(), likesCount: 2 }}
        isLoading={false}
        tableView="elements"
      />
    ),
    description: "Customowy footer",
  },
  {
    name: "AMPHelpFooter",
    value: <AMPHelpFooter footerText="Footer text" />,
    description: "Customowy footer do pomocy, informacyjny",
  },
  {
    name: "AMPInput",
    value: (
      <AMPInput
        name="Input"
        setValue={() => {}}
        value={""}
        placeholder="Custom input"
      />
    ),
    description: "Customowy input",
  },
  {
    name: "AMPMenu",
    value: (
      <AMPMenu
        isLoading={false}
        items={[{ name: "El 1" }, { name: "El 2", icon: <Md1kPlus /> }]}
      />
    ),
    description: "Menu",
  },
  {
    name: "AMPSearch",
    value: <AMPSearch isLoading={false} onSearch={() => {}} />,
    description: "Customowy search",
  },
  {
    name: "AMPSeparator",
    value: <AMPSeparator />,
    description: "Separator do oddzielania kontentu",
  },
  {
    name: "AMPSelect",
    value: (
      <AMPSelect
        options={[{ label: "label 1", value: "value 1" }]}
        setValue={() => {}}
        value={""}
        title="AMPSelect"
      />
    ),
    description: "Customowy select",
  },
  {
    name: "AMPSwitch",
    value: <AMPSwitch name="Switch" setValue={() => {}} value={true} />,
    description: "Customowy switch",
  },
  {
    name: "AMPTextarea",
    value: <AMPTextarea name="textarea" setValue={() => {}} value={""} />,
    description: "Customowy textarea",
  },
];
