import { useRouter } from "next/router";
import { ListItem } from "@mui/material";
import {
  AsideBarLink,
  AsideBarAccordion,
  AsideBarAccordionLink,
} from "../components/AsideBar";
import {
  AccountCircleIcon,
  LockIcon,
  PeopleIcon,
  SettingsIcon,
  ReceiptIcon,
  LocalOfferIcon,
  FormatListBulletedIcon,
  HelpIcon,
  StarRateIcon,
} from "../icons";

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
    case "ecommerce":
      return (
        <>
          <ListItem disablePadding>
            <AsideBarLink
              icon={<ReceiptIcon />}
              text={"pedidos"}
              href={"/ecommerce/pedidos"}
            />
          </ListItem>
          <ListItem disablePadding>
            <AsideBarAccordion icon={<LocalOfferIcon />} text={"produtos"}>
              <AsideBarAccordionLink text="Lista de produtos" href="/" />
              <AsideBarAccordionLink text="Adicionar produto" href="/" />
            </AsideBarAccordion>
          </ListItem>
          <ListItem disablePadding>
            <AsideBarAccordion
              icon={<FormatListBulletedIcon />}
              text={"categorias"}
            >
              <AsideBarAccordionLink text="Lista de categorias" href="/" />
              <AsideBarAccordionLink text="Adicionar categoria" href="/" />
            </AsideBarAccordion>
          </ListItem>
          <ListItem disablePadding>
            <AsideBarAccordion icon={<HelpIcon />} text={"faqs"}>
              <AsideBarAccordionLink text="Lista de FAQs" href="/" />
              <AsideBarAccordionLink text="Adicionar FAQ" href="/" />
            </AsideBarAccordion>
          </ListItem>
          <ListItem disablePadding>
            <AsideBarAccordion icon={<StarRateIcon />} text={"parcerias"}>
              <AsideBarAccordionLink text="Parceiros" href="/" />
              <AsideBarAccordionLink text="Produtos" href="/" />
            </AsideBarAccordion>
          </ListItem>
        </>
      );
  }
};
