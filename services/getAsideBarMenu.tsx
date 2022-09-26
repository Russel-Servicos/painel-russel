import { useRouter } from "next/router";
import { ListItem } from "@mui/material";
import {
  AsideBarLink,
  AsideBarAccordion,
  AsideBarAccordionLink,
} from "../components/AsideBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

export default () => {
  let { pathname } = useRouter();
  pathname = pathname.split("/")[1];

  return getAsideBarMenuLlist(pathname);
};

const getAsideBarMenuLlist = (path: string) => {
  switch (path) {
    case "":
      return (
        <>
          <ListItem disablePadding>
            <AsideBarLink
              icon={<AccountCircleIcon />}
              text={"meu perfil"}
              href="/ecommerce"
            />
          </ListItem>
          <ListItem disablePadding>
            <AsideBarLink
              icon={<LockIcon />}
              text={"alterar senha"}
              href={"/"}
            ></AsideBarLink>
          </ListItem>
          <ListItem disablePadding>
            <AsideBarAccordion icon={<PeopleIcon />} text={"usuários"}>
              <AsideBarAccordionLink href="/" text="Lista de usuários" />
              <AsideBarAccordionLink href="/" text="Adicionar usuário" />
            </AsideBarAccordion>
          </ListItem>
          <ListItem disablePadding>
            <AsideBarAccordion icon={<SettingsIcon />} text={"configurações"}>
              <AsideBarAccordionLink href="/" text="Gerais" />
              <AsideBarAccordionLink href="/" text="Funções" />
              <AsideBarAccordionLink href="/" text="Permissões" />
              <AsideBarAccordionLink href="/" text="Tema" />
              <AsideBarAccordionLink href="/" text="SMTP" />
              <AsideBarAccordionLink href="/" text="Banco de dados" />
              <AsideBarAccordionLink href="/" text="Chaves de API" />
            </AsideBarAccordion>
          </ListItem>
        </>
      );
  }
};
