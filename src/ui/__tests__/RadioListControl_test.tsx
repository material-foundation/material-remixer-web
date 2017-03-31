import * as chai from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';

import { remixer } from '../../core/Remixer';
import { Variable } from '../../core/variables/Variable';
import { CSS } from '../../lib/Constants';
import { RadioListControl } from '../controls/RadioListControl';

const expect = chai.expect;

describe('RadioListControl', () => {
  const key: string = 'test_variable';
  const initialValue: string = 'a';
  const limitedToValues: string[] = ['a', 'b'];
  let variable: Variable;

  beforeEach(() => {
    variable = remixer.addStringVariable(key, initialValue, limitedToValues);
    this.component = TestUtils.renderIntoDocument(
      <RadioListControl
        variable={variable}
        updateVariable={null}
      />,
    );
  });

  it('should render with proper class name', () => {
    const control = TestUtils.findRenderedDOMComponentWithClass(
      this.component, CSS.RMX_RADIO_LIST,
    );

    expect(TestUtils.isDOMComponent(control)).to.be.true;
  });

  it('have correct number of children with proper data values', () => {
    const list = TestUtils.findRenderedDOMComponentWithClass(
      this.component, 'control',
    );

    expect(list.children.length).to.equal(2);

    const elements = TestUtils.scryRenderedDOMComponentsWithClass(
      this.component, 'mdl-radio__button',
    ) as HTMLInputElement[];

    for (let i = 0; i < elements.length; i++) {
      expect(elements[i].value).to.equal(limitedToValues[i]);
    }
  });
});
