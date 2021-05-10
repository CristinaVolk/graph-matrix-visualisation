import axios from "axios";
import moxios from "moxios";
import sinon from "sinon";
import { strictEqual } from "assert";
import { renderHook } from "@testing-library/react-hooks";

import * as hooks from "./useGetCharMatrixData";
import { URL } from "./../utils/appData";

describe("mocking axios request", () => {
  const mockedDataResponse = {
    nodes: [
      {
        name: "Myriel",
        group: 1,
      },
      {
        name: "Napoleon",
        group: 1,
      },
    ],

    links: [
      {
        source: 1,
        target: 0,
        value: 1,
      },
      {
        source: 2,
        target: 0,
        value: 8,
      },
    ],
  };

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it("fetches data from URL successfully", (done) => {
    const mockedfetchCharMatrixData = jest.fn();
    hooks.useGetCharMatrixData = jest.fn().mockReturnValue({
      fetchCharMatrixData: mockedfetchCharMatrixData,
    });

    const { result } = renderHook(() => hooks.useGetCharMatrixData());
    result.current.fetchCharMatrixData();

    moxios.withMock(() => {
      let onFulfilled = sinon.spy();
      axios.get(URL).then(onFulfilled);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: mockedDataResponse,
          })
          .then(() => {
            strictEqual(onFulfilled.called, true);
            strictEqual(
              onFulfilled.getCall(0).args[0].data,
              mockedDataResponse,
            );
            done();
          });
      });
    });
    expect(mockedfetchCharMatrixData).toHaveBeenCalled();
  });
});
