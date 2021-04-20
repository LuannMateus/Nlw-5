import { format } from "date-fns";
import style from "./styles.module.scss";

type Props = {};
export const Header = (_props: Props) => {
  const currentDate = format(new Date(), "EEEEEE, d MMMM");

  return (
    <header className={style.headerContainer}>
      <img src="/logo.svg" alt="Podcastr" />
      <p>The best for you to hear, always</p>
      <span>{currentDate}</span>
    </header>
  );
};
