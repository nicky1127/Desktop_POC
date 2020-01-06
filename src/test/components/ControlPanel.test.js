import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { MenuItem } from '@material-ui/core';
import ControlPanel from '../../components/ControlPanel';

describe('ControlPanel', () => {
  it('should render coorectly', () => {
    // shallow a ControlPanel instance
    const component = shallow(<ControlPanel />);

    // assert if AppBar component is contained in ControlPanel's render
    expect(component.find(AppBar).length).toBe(1);
  });

  it('should open profile menu when clicking profile button', () => {
    const component = shallow(<ControlPanel />);

    // access the profile button which is third <IconButton/>
    const profileBtn1 = component.find(IconButton).at(6);
    // fire a simulate action to mock clicking on the button
    profileBtn1.simulate('click', { currentTarget: true });
    // assert the props open of Profile Menu is true
    expect(
      component
        .find(Menu)
        .at(1)
        .props().open
    ).toBe(true);

    const profileBtn2 = component.find(IconButton).at(8);
    profileBtn2.simulate('click', { currentTarget: true });
    // assert the props open of Mobile Profile Menu is true
    // expect( 
    //   component
    //     .find(Menu)
    //     .at(0)
    //     .props().open
    // ).toBe(true);
  });
  it('should close profile menu ', () => {
    const component = shallow(<ControlPanel />);
    const profileBtn1 = component.find(IconButton).at(2);
    profileBtn1.simulate('click', { currentTarget: <button /> });

    // const menuComponent = component.find(MenuItem).at(4);
    // menuComponent.simulate('click');

    // shallow a instance of profile menu <Menu/>
    const menuComponent = shallow(component.props().children[2]);
    menuComponent
      .find(MenuItem)
      .first()
      .simulate('click');

    // assert the profile menu is closed
    expect(
      component
        .find(Menu)
        .at(1)
        .props().open
    ).toBe(false);
  });
});
