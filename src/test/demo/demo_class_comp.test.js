import Demo from '../../components/Demo';

describe('Demo',()=>{
    it('should render one <p> element', ()=>{
        const component = shallow(<Demo/>);
        expect(component.find('p').length).toBe(1);
    });
    it('should render with default state', ()=>{
        const component = shallow(<Demo name='Santa'/>);
        expect(component.state().value).toBe(0);
        expect(component.state().name).toBe('Santa');
    });
    it('should update state value when clicking the button', ()=>{
        const component = shallow(<Demo/>);
        const btn = component.find('button');
        btn.simulate('click');
        expect(component.state().value).toBe(1);
    });

});