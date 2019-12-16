import ControlPanel from '../../components/ControlPanel';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

describe('ControlPanel', () => {
  it('should render coorectly', () => {
    const component = shallow(<ControlPanel />);
    expect(component.find(AppBar).length).toBe(1);
  });
  it('should open profile menu when clicking profile button', () => {
    const component = shallow(<ControlPanel />);
    const profileBtn = component.find(IconButton).at(2);
    profileBtn.simulate('click', { currentTarget:true });
    
    expect(component.find(Menu).at(1).props().open).toBe(true); 

  });
});
