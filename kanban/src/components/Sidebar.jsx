import Burger from '../../public/Burger.svg'
import Branding from "../../public/branding.png"
import Dashboard from "../../public/dashboard.svg"

export default function Sidebar() {
    return (
        <div className='sidebar flex flex-col gap-4 w-2xs py-5 bg-[#F2F5FA]'>
            <div className='flex w-full items-center justify-between'>
                <div className='sidebar-logo logo flex items-center'>
                    <img className='logo__image mb-7' src={Branding} />
                    <h1 className="logo__title font-[Noto_Serif_TC] font-bold text-xl">Captain</h1>
                </div>
                <img src={Burger}/>
            </div>
            <nav className='kanban-navigation font-[Open_Sans] font-medium text-sm line-'>
                <ul className='kanban-navigation-list'>
                    <li className='kanban-nabigation__item'>
                        <button className='kanban-nabigation__button flex gap-3'>
                            <img src={Dashboard} />
                            Дашборд
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}