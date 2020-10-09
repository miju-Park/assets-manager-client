import React from 'react';
import styled from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';
import { Dashboard } from '@styled-icons/zondicons/Dashboard';
import { Monitor } from '@styled-icons/open-iconic/Monitor';
import { GraphUp } from '@styled-icons/bootstrap/GraphUp';
import { HandHoldingUsd } from '@styled-icons/fa-solid/HandHoldingUsd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const IconStyleWrapper = styled.div`
  ${StyledIconBase} {
    text-align: center;
    width: 34px;
    height: 34px;
    line-height: 34px;
    position: absolute;
    left: 5px;
    top: 50%;
    margin-top: -17px;
    font-size: 1.5rem;
    -webkit-transition: color 300ms;
    -o-transition: color 300ms;
    transition: color 300ms;
  }
`;

const SidebarContainer = styled.div`
  background: #ba54f5;
  background: linear-gradient(0deg, #ba54f5, #e14eca);
  height: calc(100vh - 90px);
  width: 230px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-size: cover;
  background-position: 50%;
  display: block;
  box-shadow: 0 0 45px 0 rgba(0, 0, 0, 0.6);
  margin-top: 80px;
  margin-left: 20px;
  border-radius: 5px;
  transition: 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
`;

const SidebarWrapper = styled.div`
  padding: 2px 1.5rem 1.5rem;
  @media (min-width: 991px) {
    transition-property: top, bottom, width;
    transition-duration: 0.2s, 0.2s, 0.35s;
    transition-timing-function: linear, linear, ease;
  }
`;

const SubTitle = styled.h5`
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  font-size: 1rem;
  margin: 0.75rem 0;
  font-weight: bold;
  white-space: nowrap;
  position: relative;
`;
const MenuContainer = styled.div`
  box-sizing: border-box;
  text-align: -webkit-match-parent;
  position: relative;
`;
const MenuItem = styled(Link)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  background-color: ${(props: { active: boolean }) =>
    props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  font-weight: bold;
  -webkit-transition: height 300ms, color 300ms, background-color 300ms,
    -webkit-transform 0.2s;
  transition: height 300ms, color 300ms, background-color 300ms,
    -webkit-transform 0.2s;
  -o-transition: transform 0.2s, height 300ms, color 300ms,
    background-color 300ms;
  transition: transform 0.2s, height 300ms, color 300ms, background-color 300ms;
  transition: transform 0.2s, height 300ms, color 300ms, background-color 300ms,
    -webkit-transform 0.2s;
  display: block;
  line-height: 2.5rem;
  height: 2.5rem;
  padding: 0 1.5rem 0 45px;
  position: relative;
  border-radius: 0.25rem;
  white-space: nowrap;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255);
  }
`;

const Sidebar = () => {
  const pathname = useLocation().pathname;
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SubTitle>Home</SubTitle>
        <MenuContainer>
          <MenuItem to="/" active={pathname === '/'}>
            <IconStyleWrapper>
              <Dashboard />
            </IconStyleWrapper>
            Dashboard
          </MenuItem>
        </MenuContainer>
        <SubTitle>Management</SubTitle>
        <MenuContainer>
          <MenuItem
            to="/setting/krstock"
            active={pathname === '/setting/krstock'}
          >
            <IconStyleWrapper>
              <Monitor />
            </IconStyleWrapper>
            국내주식
          </MenuItem>
        </MenuContainer>
        <MenuContainer>
          <MenuItem
            to="/setting/usdstock"
            active={pathname === '/setting/usdstock'}
          >
            <IconStyleWrapper>
              <GraphUp />
            </IconStyleWrapper>
            해외주식
          </MenuItem>
        </MenuContainer>
        <MenuContainer>
          <MenuItem
            to="/setting/account"
            active={pathname === '/setting/account'}
          >
            <IconStyleWrapper>
              <HandHoldingUsd />
            </IconStyleWrapper>
            예/적금 & CMA
          </MenuItem>
        </MenuContainer>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
